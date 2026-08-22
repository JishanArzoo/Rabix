import Chat from "./components/Chat";
import Navbar from "./components/Navbar";

export default function Page() {
  return (
        <div className="flex h-screen flex-col overflow-hidden">
          <header className="shrink-0">
              <Navbar />
          </header>
              <main className=" flex-1 min-h-0">
              <Chat />;
              </main>
         
            </div> 
  )   
}