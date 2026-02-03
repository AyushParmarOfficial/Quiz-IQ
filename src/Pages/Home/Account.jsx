import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { getApi } from "@/Services/Api";
import { User, Phone, Mail, ShieldCheck, Edit3, Save, X, Fingerprint, ShieldAlert, Award, FileText } from 'lucide-react';
import Loader from "@/Components/Common/Loader";
import { NavLink } from "react-router-dom";
import InputGroup from "@/Components/Forms/InputGroup";
import InfoDisplay from "@/Components/Ui/InfoDisplay";

// #################### 3D Hero Section ####################

function AccountHero({ user }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  // Reset when mouse leaves
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

  return (
    <div className="relative w-full py-20 md:py-32 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[100px] -z-10" />

      <div
        className="perspective-1000 max-w-6xl mx-auto px-4 w-full grid md:grid-cols-2 gap-12 items-center"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {/* Text Content */}
        <div className="text-center md:text-left space-y-6 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-neutral-900 dark:text-white leading-tight">
              Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600">
                Legacy.
              </span>
            </h1>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto md:mx-0 font-medium leading-relaxed">
              Manage your profile, track your progress, and see where you stand among the best.
            </p>
          </motion.div>
        </div>

        {/* 3D Card */}
        <div className="flex justify-center md:justify-end order-1 md:order-2">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-72 h-80 md:w-96 md:h-[400px] bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-white/10 shadow-2xl shadow-rose-500/20 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <div style={{ transform: "translateZ(40px)" }} className="absolute inset-4 rounded-2xl border border-neutral-100 dark:border-white/5 bg-gradient-to-br from-rose-500/5 to-indigo-500/5 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-600 p-[2px] shadow-lg">
                <div className="w-full h-full rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center">
                  <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-rose-500 to-indigo-600">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{user?.name || "User"}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {user?.user_type === 'a' ? 'Administrator' : 'Challenger'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// #################### Tab Configuration ####################

const tabs = [
  { label: "Profile", value: "account", icon: User },
  { label: "Results", value: "result", icon: Award },
  { label: "Answers", value: "answers", icon: FileText },
]

// #################### Main Component ####################

export default function Account() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleData = async (url) => {
    await getApi(data, setData, url, setLoading);
  }

  useEffect(() => {
    let url = "account";
    if (selectedTab.value !== "account") {
      url += `?type=${selectedTab.value}`;
    }
    handleData(url);
  }, [selectedTab]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#030303] transition-colors duration-300">
      {loading && !data && <Loader />}

      <div className="pt-20">
        <AccountHero user={data} />
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24 -mt-10 relative z-10">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1.5 bg-white dark:bg-neutral-900/50 backdrop-blur-md rounded-2xl border border-neutral-200 dark:border-white/10 shadow-lg gap-1">
            {tabs.map((tabItem) => (
              <button
                key={tabItem.value}
                onClick={() => setSelectedTab(tabItem)}
                className={`
                                    relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 z-0 flex items-center gap-2
                                    ${tabItem.value === selectedTab.value ? "text-white shadow-md" : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5"}
                                `}
              >
                {tabItem.value === selectedTab.value && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-rose-500 to-indigo-600 rounded-xl -z-10"
                  />
                )}
                <tabItem.icon size={16} />
                {tabItem.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab.value === "account" && <AccountSection user={data} />}
            {selectedTab.value === "result" && (
              <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-xl text-center">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Quiz Results</h3>
                <p className="text-neutral-500 dark:text-neutral-400">Your recent quiz performance will appear here.</p>
              </div>
            )}
            {selectedTab.value === "answers" && (
              <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-xl text-center">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">My Answers</h3>
                <p className="text-neutral-500 dark:text-neutral-400">Review your submitted answers history.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// #################### Profile Section ####################

function AccountSection({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      // Here you would trigger a re-fetch or update local state
    }, 1500);
  };

  if (!user) return null;

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300">
        <form onSubmit={handleSave} className="animate-in fade-in zoom-in-95 duration-300">
          <div className="flex justify-between items-center p-8 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Edit Profile</h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">Update your personal preferences</p>
            </div>
            <button
              type="button"
              onClick={() => { setIsEditing(false); setFormData({ ...user }); }}
              className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full transition-colors"
            >
              <X size={24} className="text-neutral-500" />
            </button>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputGroup
              label="Full Name"
              value={formData.name || ''}
              onChange={(v) => setFormData({ ...formData, name: v })}
              icon={<User size={18} />}
            />
            <InputGroup
              label="Email Address"
              type="email"
              value={formData.email || ''}
              onChange={(v) => setFormData({ ...formData, email: v })}
              icon={<Mail size={18} />}
            />
            <InputGroup
              label="Mobile Number"
              value={formData.mobile || ''}
              onChange={(v) => setFormData({ ...formData, mobile: v })}
              icon={<Phone size={18} />}
            />

            <InputGroup
              label="Account Type"
              value={formData.user_type === 'a' ? 'Administrator' : 'Standard User'}
              icon={<ShieldAlert size={18} />}
              disabled={true}
            />
          </div>

          <div className="p-8 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 flex gap-4">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-rose-500 to-indigo-600 hover:shadow-lg hover:shadow-rose-500/20 text-white rounded-xl font-bold transition-all disabled:opacity-70"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-8 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
      <div className="p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">{user.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-full text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                {user.user_type === 'a' ? 'Admin Access' : 'User Access'}
              </span>
              <span className="text-neutral-500 dark:text-neutral-400 text-xs flex items-center gap-1 font-mono">
                <Fingerprint size={12} /> ID: {user.id}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 sm:mt-0 group flex items-center gap-2 px-5 py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl text-neutral-900 dark:text-white text-sm font-semibold transition-all active:scale-95"
          >
            <Edit3 size={16} className="text-neutral-500 group-hover:text-rose-500 transition-colors" />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoDisplay icon={<User size={18} />} label="Full Name" value={user.name} />
          <InfoDisplay icon={<Mail size={18} />} label="Email Address" value={user.email} />
          <InfoDisplay icon={<Phone size={18} />} label="Mobile Number" value={user.mobile} />
          <InfoDisplay icon={<ShieldCheck size={18} />} label="Account Role" value={user.user_type === 'a' ? 'Administrator' : 'Standard User'} />
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-xs text-neutral-400 text-center uppercase tracking-widest">
            Joined {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
}

// #################### Helper Components ####################




