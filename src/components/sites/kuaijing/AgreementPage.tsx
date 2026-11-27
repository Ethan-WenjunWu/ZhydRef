/* eslint-disable @next/next/no-img-element */

import "./kuaijing-agreement.css";

const LOGO_SRC = "/sites/kuaijing/images/logo.png";

type AgreementPageProps = {
  title: string;
  /** Verbatim body copy from the source page (trusted static content). */
  content: string;
};

export function AgreementPage({ title, content }: AgreementPageProps) {
  return (
    <div className="kuaijing-agreement">
      <div className="header">
        <div className="header_container">
          <img src={LOGO_SRC} alt="快鲸资产管理运营系统" />
          <div className="title">{title}</div>
        </div>
      </div>
      {/* Source markup is plain text separated by <br /> elements. */}
      <div className="body" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
