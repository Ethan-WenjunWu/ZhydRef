import type { Metadata } from "next";

import { AgreementPage } from "@/components/sites/kuaijing/AgreementPage";
import { PRIVACY_POLICY_CONTENT } from "@/components/sites/kuaijing/agreement-content";

export const metadata: Metadata = {
  title: "隐私政策 - 快鲸资产管理运营系统",
};

export default function PrivacyPolicyPage() {
  return <AgreementPage title="隐私政策" content={PRIVACY_POLICY_CONTENT} />;
}
