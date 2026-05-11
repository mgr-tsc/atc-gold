import React, { useEffect, useRef, useState } from 'react';
import { Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TURNSTILE_SCRIPT_ID = 'cloudflare-turnstile-script';
const TURNSTILE_SCRIPT_URL =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

function loadTurnstileScript() {
  if (window.turnstile) {
    return Promise.resolve();
  }

  const existingScript = document.getElementById(TURNSTILE_SCRIPT_ID);
  if (existingScript) {
    if (existingScript.dataset.loaded === 'true') {
      return Promise.resolve();
    }

    if (existingScript.dataset.failed === 'true') {
      existingScript.remove();
    } else {
      return new Promise((resolve, reject) => {
        existingScript.addEventListener('load', resolve, { once: true });
        existingScript.addEventListener('error', reject, { once: true });
      });
    }
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = TURNSTILE_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = () => {
      script.dataset.failed = 'true';
      reject(new Error('Turnstile script failed to load.'));
    };
    document.head.appendChild(script);
  });
}

export default function TurnstileVerification({
  enabled,
  action,
  token,
  onTokenChange,
  resetSignal = 0,
  lockedMessage = 'Finish the required fields above to unlock verification.',
  completedMessage = 'Verification complete',
}) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [siteKey, setSiteKey] = useState('');
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setError('');
      onTokenChange('');
    }
  }, [enabled, onTokenChange]);

  useEffect(() => {
    onTokenChange('');

    if (window.turnstile && widgetIdRef.current !== null) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [onTokenChange, resetSignal]);

  useEffect(() => {
    if (!enabled || siteKey) return undefined;

    let ignore = false;
    setError('');

    fetch('/api/turnstile-config')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Turnstile site key is not configured.');
        }
        return response.json();
      })
      .then((body) => {
        if (!ignore) {
          setSiteKey(body.siteKey || '');
        }
      })
      .catch(() => {
        if (!ignore) {
          setError('Security verification is not available yet.');
        }
      });

    return () => {
      ignore = true;
    };
  }, [enabled, retryCount, siteKey]);

  useEffect(() => {
    const shouldRender = enabled && siteKey && containerRef.current;

    if (!shouldRender) {
      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      onTokenChange('');
      return undefined;
    }

    if (widgetIdRef.current !== null) {
      return undefined;
    }

    let cancelled = false;
    setError('');

    loadTurnstileScript()
      .then(() => {
        if (
          cancelled ||
          !window.turnstile ||
          !containerRef.current ||
          widgetIdRef.current !== null
        ) {
          return;
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          theme: 'light',
          size: 'flexible',
          callback: (nextToken) => {
            onTokenChange(nextToken);
            setError('');
          },
          'expired-callback': () => {
            onTokenChange('');
            setError('Security verification expired. Please try again.');
          },
          'error-callback': () => {
            onTokenChange('');
            setError('Security verification failed. Please try again.');
            return true;
          },
        });
      })
      .catch(() => {
        setError('Security verification could not load.');
      });

    return () => {
      cancelled = true;
    };
  }, [action, enabled, onTokenChange, siteKey]);

  const retry = () => {
    onTokenChange('');
    setError('');
    setSiteKey('');

    if (window.turnstile && widgetIdRef.current !== null) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }

    setRetryCount((current) => current + 1);
  };

  if (!enabled) {
    return <p className="mt-3 text-sm text-muted-foreground">{lockedMessage}</p>;
  }

  return (
    <div className="mt-4">
      <div ref={containerRef} />
      {token && (
        <p className="mt-2 flex items-center gap-2 text-sm text-green-700">
          <Check className="h-4 w-4" />
          {completedMessage}
        </p>
      )}
      {error && (
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <p className="text-sm text-destructive">{error}</p>
          <Button type="button" variant="outline" size="sm" onClick={retry}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry verification
          </Button>
        </div>
      )}
    </div>
  );
}
