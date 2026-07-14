import type { Metadata } from "next";
import { NewsCms } from "@/components/admin/NewsCms";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "NEWS管理 | U⇔U CMS",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminNewsPage() {
  return <NewsCms />;
}
