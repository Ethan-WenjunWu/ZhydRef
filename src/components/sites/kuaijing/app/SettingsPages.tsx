"use client";

import type { ReactNode } from "react";

import { AiAgentsPage, AiBasicPage, AiModelPage, AiQuestionsPage } from "./settings-pages/ai";
import {
  AccountsPage,
  CompanyInfoPage,
  CompanyListPage,
  PaymentConfigPage,
} from "./settings-pages/company";
import {
  AppPage,
  DingtalkPage,
  FeishuPage,
  WechatMiniPage,
  WechatServicePage,
  WecomPage,
} from "./settings-pages/integrations";
import { OperationLogPage } from "./settings-pages/logs";
import {
  ContactAuthPage,
  ContactDisplayPage,
  MembersPage,
  MenusPage,
  RolesPage,
} from "./settings-pages/org";

const SETTINGS_COMPONENTS: Record<string, () => ReactNode> = {
  "company-info": CompanyInfoPage,
  "company-list": CompanyListPage,
  accounts: AccountsPage,
  "payment-config": PaymentConfigPage,
  members: MembersPage,
  roles: RolesPage,
  menus: MenusPage,
  "contact-auth": ContactAuthPage,
  "contact-display": ContactDisplayPage,
  "ai-basic": AiBasicPage,
  "ai-model": AiModelPage,
  "ai-questions": AiQuestionsPage,
  "ai-agents": AiAgentsPage,
  "wechat-service": WechatServicePage,
  "wechat-mini": WechatMiniPage,
  wecom: WecomPage,
  dingtalk: DingtalkPage,
  feishu: FeishuPage,
  app: AppPage,
  "operation-log": OperationLogPage,
};

export function SettingsPageRenderer({ slug }: { slug: string }) {
  const Component = SETTINGS_COMPONENTS[slug];
  if (!Component) return null;
  return <Component />;
}
