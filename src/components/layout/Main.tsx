export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className='w-full px-4 py-8 text-gray-950 dark:text-gray-50'>
      { children }
    </main>
  );
}
