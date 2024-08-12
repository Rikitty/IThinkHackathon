import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-between p-8">
      {/* Header Section */}
      <header className="w-full flex justify-between items-center py-4 px-8">
        <h1 className="text-3xl font-bold text-white">VIBE</h1>
        <div className="flex space-x-4">
          <Button className="bg-transparent text-white font-semibold border border-yellow-500 hover:bg-yellow-500 hover:text-black px-4 py-2 rounded transition-colors">
            Login
          </Button>
          <Button className="bg-yellow-500 text-white font-semibold px-4 py-2 rounded hover:bg-yellow-600 hover:text-black transition-colors">
            Sign up
          </Button>
        </div>
      </header>

      {/* Main Content Section */}
      <section className="text-center my-8">
        <h2 className="text-4xl font-bold mb-4">Making <span className="text-yellow-500">Volunteerism</span> more Exciting</h2>
        <p className="text-xl mb-8">Join the force to create a fun and exciting experience</p>
        <div className="bg-yellow-500 text-black font-semibold text-4xl py-6 px-12 rounded-full inline-block">
          14:18:00
        </div>
      </section>

      {/* Increaser in Action Section */}
      <section className="my-8">
        <h3 className="text-3xl font-bold mb-6">Increaser in <span className="text-yellow-500">Action</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Repeat for each increaser action card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg">Username: aja102</p>
            <p className="text-gray-400 mt-4">Some description about the user's action goes here.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg">Username: user2</p>
            <p className="text-gray-400 mt-4">Another description about the user's action.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg">Username: user3</p>
            <p className="text-gray-400 mt-4">More details about the user's action.</p>
          </div>
          {/* Add more cards as needed */}
        </div>
      </section>

      {/* Welcome Section */}
      <section className="my-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome to Your Partner In <span className="text-yellow-500">Volunteerism</span></h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          VIBE (Volunteer Impact Blockchain Ecosystem) tackles the challenge of low volunteer engagement by making volunteering more fun and rewarding. Through a gamified approach, volunteers earn digital tokens for their contributions and task completion. Smart contracts ensure secure and transparent management of both internal funds and crypto donations from supporters. This system benefits everyone involved. Volunteers gain valuable networking opportunities while earning tokens, and organizations can build a strong community by connecting with active volunteers. VIBE essentially hits two birds with one stone – making volunteering enjoyable and fostering stronger connections within the community.
        </p>
      </section>

      {/* Questions Section */}
      <section className="my-8 text-center">
        <h2 className="text-3xl font-bold mb-4"><span className="text-yellow-500">Questions?</span> We're Here to Help</h2>
        <div className="space-y-4">
          <p className="text-gray-400">Will VIBE solve the module sync issue?</p>
          <p className="text-gray-400">Can other environments sync your token event?</p>
          <p className="text-gray-400">How can I get my rewards?</p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="my-8 text-center">
        <p className="text-xl font-bold mb-4">Be Heard</p>
        <Button className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded">Sign up</Button>
        <p className="text-gray-600 mt-6">VeeBy Software Development Services 2024</p>
      </footer>
    </main>
  );
}