import { useEffect } from "react";
import { errorConfigs } from "../../../application/constants/errors";

import "./ErrorPage.scss";

type ErrorPageProps = {
  errorCode?: string;
  customTitle?: string;
  customDescription?: string;
};
const ErrorPage = (props: ErrorPageProps) => {
  const { errorCode, customTitle, customDescription } = props;

  const getErrorType = (): string => {
    if (errorCode) return errorCode;

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const codeFromUrl = urlParams.get("code");
      if (codeFromUrl && errorConfigs[codeFromUrl]) return codeFromUrl;
    } catch {
      // Ignore errors if URL parsing fails
    }

    return "404";
  };

  const errorType = getErrorType();
  const errorConfig = errorConfigs[errorType] || errorConfigs.default;

  useEffect(() => {
    console.error(
      `${errorConfig.code} Error: User encountered error on route:`,
      window.location.pathname,
    );
  }, [errorConfig.code]);

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={`error-page error-page--${errorConfig.color}`}>
      <div className="error-page__container">
        <h1 className="error-page__error-code">{errorConfig.code}</h1>
        <h4 className="error-page__title">
          {customTitle || errorConfig.title}
        </h4>
        <p className="error-page__description">
          {customDescription || errorConfig.description}
        </p>
        <div className="error-page__actions">
          <button className="error-page__button primary" onClick={handleGoHome}>
            Go Home
          </button>
          <button
            className="error-page__button outlined"
            onClick={handleGoBack}
          >
            Go Back
          </button>
          <button className="error-page__button text" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
