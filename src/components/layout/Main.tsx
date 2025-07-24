export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className='h-[93%] w-full px-4 py-8 bg-slate-50 dark:bg-slate-950 text-gray-950 dark:text-gray-50'>
      { children }
    </main>
  );
}
