import { Code, Users, Zap } from "lucide-react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import JoinRoom from "../components/ui/JoinRoom";
import CreateRoomButton from "../components/buttons/CreateRoomButton";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Code Together,
              <span className="text-blue-600"> In Real Time</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
              CodeCollab is a real-time collaborative coding IDE that lets you
              and your coding buddy write, edit, and debug code together
              seamlessly, no matter where you are.
            </p>
          </div>

          {/* Features Icons */}
          <div className="flex justify-center space-x-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mb-2">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Collaborate
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-2">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Real-time
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mb-2">
                <Code className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Code
              </span>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
              Ready to start coding together?
            </h3>

            {/* Create Room */}
            <div className="flex justify-center mb-6">
              <CreateRoomButton />
            </div>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
              <span className="px-4 text-slate-500 dark:text-slate-400 text-sm">
                or
              </span>
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
            </div>

            {/* Join Room */}
            <JoinRoom />
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Instant Setup
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                No downloads required. Start coding in seconds with just a room
                code.
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Live Cursors
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                See exactly where your partner is editing with real-time cursor
                tracking.
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Multiple Languages
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Support for JavaScript, Python, Java, C++, and many more
                languages.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
