import Navbar from './components/Navbar';  // Adjust if needed

export const metadata = {
  title: "Colin's Phone Shop",
  description: "Best phones in town!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ padding: '20px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
