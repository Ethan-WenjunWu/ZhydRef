import type { Metadata } from "next";

import { AgreementPage } from "@/components/sites/kuaijing/AgreementPage";
import { USER_AGREEMENT_CONTENT } from "@/components/sites/kuaijing/agreement-content";

export const metadata: Metadata = {
  title: "用户协议 - 快鲸资产管理运营系统",
};

export default function UserAgreementPage() {
  return <AgreementPage title="用户协议" content={USER_AGREEMENT_CONTENT} />;
}
