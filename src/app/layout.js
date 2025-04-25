
import Navbar from '../components/navbar';  // import the Navbar component

export const metadata = {
  title: "Colin's Phone Shop",

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
