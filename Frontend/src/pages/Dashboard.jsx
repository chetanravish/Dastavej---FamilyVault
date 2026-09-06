import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth_context";
import { logOut, getDocument, getFamilyMembers } from "../api/devvault.api";

import Sidebar from "../components/Dashboard/Sidebar.jsx";
import Topbar from "../components/Dashboard/Topbar.jsx";
import WelcomeCard from "../components/Dashboard/WelcomeCard.jsx";
import StatsCards from "../components/Dashboard/StatsCard.jsx";
import RecentDocuments from "../components/Dashboard/RecentDocument.jsx";
import DocumentModel from "../components/Dashboard/DocumentModel.jsx";
import UploadDocModel from "../components/Dashboard/UploadDocModel.jsx";
import DocumentViewer from "../components/Dashboard/DocumentViewer";
import Family from "../components/Dashboard/Family.jsx"
import AddMemberModel from "../components/Dashboard/AddMember.jsx";
import FamilyFilter from "../components/Dashboard/FamilyFilter.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, setUser, setAccessToken } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("documents");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [members, setMembers] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  

  const filteredDocuments = selectedMember
    ? documents.filter((doc) => doc.member?._id === selectedMember._id)
    : documents;


  useEffect(() => {
    const fetchMembers = async () => {
      const data = await getFamilyMembers();
      setMembers(data.members);
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getDocument();
        setDocuments(data.documents);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDocuments();
  }, []);
  useEffect(() => {
  console.log("AUTH USER:", user);
}, [user]);
  
  const handleLogout = async () => {
    try {
      await logOut();
     } finally{
      setAccessToken(null);
      setUser(null);
      navigate("/", { replace: true });}
  };

 return (
  <div className="flex min-h-screen bg-[#0B0F19] text-white">
    {/* Sidebar */}
    <Sidebar
      user={user}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
      isOpen={mobileMenu}
      onClose={() => setMobileMenu(false)}
    />

    {/* Main */}
    <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-x-hidden">
      <Topbar
        search={search}
        setSearch={setSearch}
        user={user}
        onUpload={() => setIsUploadOpen(true)}
        onMenu={() => setMobileMenu(true)}
      />

      {/* KEEP EVERYTHING BELOW EXACTLY SAME */}
      {activeTab === "documents" && (
        <div className="space-y-5 md:space-y-6">
          <WelcomeCard user={user} onUpload={() => setIsUploadOpen(true)} />

          <FamilyFilter
            members={members}
            documents={documents}
            selectedMember={selectedMember}
            onSelect={setSelectedMember}
            onAddClick={() => setIsAddOpen(true)}
          />

          <StatsCards
            totalDocs={filteredDocuments.length}
            familyMembers={members.length}
            secureNotes={0}
          />

          <UploadDocModel
            isOpen={isUploadOpen}
            onClose={() => setIsUploadOpen(false)}
            members={members}
            onSuccess={(newDoc) =>
              setDocuments((prev) => [newDoc, ...prev])
            }
          />

          {selectedMember && (
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between bg-[#131826] border border-blue-500/20 rounded-xl px-4 py-3">
              <p className="text-blue-300 text-sm">
                Viewing <b>{selectedMember.name}</b>
              </p>

              <button
                onClick={() => setSelectedMember(null)}
                className="text-sm text-gray-300"
              >
                Clear Filter
              </button>
            </div>
          )}

          <RecentDocuments
            documents={filteredDocuments}
            search={search}
            onView={setSelectedDocument}
          />

          <DocumentViewer
            document={selectedDocument}
            onClose={() => setSelectedDocument(null)}
            onDelete={(id) => {
              setDocuments((prev) =>
                prev.filter((d) => d._id !== id)
              );
              setSelectedDocument(null);
            }}
            onUpdate={(updated) => {
              setDocuments((prev) =>
                prev.map((d) =>
                  d._id === updated._id ? updated : d
                )
              );
              setSelectedDocument(updated);
            }}
          />
        </div>
      )}

      {activeTab === "family" && (
        <Family
          members={members}
          selectedMember={selectedMember}
          onSelect={setSelectedMember}
          onAddClick={() => setIsAddOpen(true)}
          onDelete={(id) => {
            setMembers((prev) =>
              prev.filter((m) => m._id !== id)
            );
            if (selectedMember?._id === id)
              setSelectedMember(null);
          }}
        />
      )}

      {activeTab === "notes" && <h1>Secure Notes</h1>}
      {activeTab === "tools" && <h1>PDF Tools</h1>}
      {activeTab === "settings" && <h1>Working On It</h1>}

      <AddMemberModel
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        memberCount={members.length}
        onSuccess={(m) =>
          setMembers((prev) => [...prev, m])
        }
      />
    </main>
  </div>
);
}