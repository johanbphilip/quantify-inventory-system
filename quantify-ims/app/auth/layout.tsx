import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row h-screen ">
      <div className="w-1/2 bg-primary p-5">
        <h2 className="font-bold text-4xl text-background">Quantify</h2>
      </div>
      {children}
    </div>
  );
}
