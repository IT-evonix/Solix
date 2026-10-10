import "../admin/admin.css";

export default function PaymentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div id="admin-root">{children}</div>;
}
