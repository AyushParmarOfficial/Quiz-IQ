import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HeroGeometric } from "@/Components/Ui/shadcn-io/shape-landing-hero"
import { getApi } from "@/Services/Api";
import { User, Phone, Mail, ShieldCheck, Edit3, Camera } from 'lucide-react';
import Loader from "@/Components/Common/Loader";

const tabs = [
  { label: "Profile", value: "account" },
  { label: "Results", value: "result" },
  { label: "Answers", value: "answers" },
]

export default function Account() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let baseUrl = "account";

  const handleData = async (url) => {
    await getApi(data, setData, url, setLoading);
  }

  useEffect(() => {
    setLeaderBoardData((prev) => ({ ...prev, [selectedTab?.value ?? 'today']: data }));
  }, [data]);

  useEffect(() => {
    if (selectedTab) {
      if (leaderBoardData && leaderBoardData[selectedTab.value]) {
        setData(leaderBoardData[selectedTab.value]);
        return;
      }
      baseUrl += `?type=${selectedTab.value}`;
    }
    handleData(baseUrl);
  }, [selectedTab]);


  return (
    <>
      {loading && <Loader />}
      {/* ######################## Hero Section ########################  */}
      <div className="min-h-full flex items-center justify-center pt-18 bg-transparent">
        <HeroGeometric
          mode="dark"
          title1=""
          title2="Account"
          description="Track your data, compete globally, and see where you lead with skill and strategy."
          className="min-h-[38vh] md:min-h-[50vh]"
        />
      </div>

      {/* ######################## Content Section  ########################  */}
      <div className="md:ml-5 mt-[40px] bg-transparent overflow-hidden md:flex flex-row items-start max-w-full overflow-x-hidden">
        {/* Tabs */}
        <nav className="h-full flex-shrink-0">
          <ul className="flex md:flex-col m-0 p-4 list-none lg:w-80 gap-5 lg:text-2xl">
            {tabs.map((tabItem) => (
              <motion.li
                key={tabItem.value}
                initial={false}
                onClick={() => setSelectedTab(tabItem)}
                className={`
                                relative flex-1 cursor-pointer select-none
                                px-4 py-2 text-center md:text-start font-medium rounded-[10px]
                                transition-colors duration-200 
                                ${tabItem === selectedTab ? "bg-indigo-500/[0.2]" : "bg-transparent"}
                            `}
              >
                {tabItem.label}

                {tabItem === selectedTab && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-1 right-1 bottom-0 h-0.5 bg-indigo-300 rounded-full"
                  />
                )}
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <main className="flex-1 md:px-[16px] md:ml-0 ml-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col md:px-5"
            >
              {selectedTab.value === "account" && (
                <AccountSection users={data} />
              )}
              {selectedTab.value === "result" && (
                <AccountSection users={data} />
              )}
              {selectedTab.value === "answers" && (
                <AccountSection users={data} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </>
  )
}

/**
 * ================= Account Section =================
 */

function AccountSection({ users }) {
  if (!users) return null;
  return (
    <div className="w-full w-max-2xl my-5 bg-transparent rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">

      {/* Content Area */}
      <div className="pb-8 px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{users.name}</h1>
            <p className="text-slate-400 text-sm flex items-center gap-2 mt-1">
              <ShieldCheck size={14} className="text-indigo-400" />
              {users.user_type === 'a' ? 'Administrator Account' : 'Standard User'}
            </p>
          </div>

          <div className="w-full sm:w-max flex justify-end">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-white text-sm font-medium transition-all active:scale-95">
              <Edit3 size={16} className="text-slate-400" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard
            icon={<User size={18} />}
            label="Full Name"
            value={users.name}
          />
          <InfoCard
            icon={<Mail size={18} />}
            label="Email Address"
            value={users.email}
          />
          <InfoCard
            icon={<Phone size={18} />}
            label="Phone Number"
            value={users.mobile}
          />
          <InfoCard
            icon={<ShieldCheck size={18} />}
            label="Account ID"
            value={`#USR-00${users.id}`}
          />
        </div>

        {/* Footer Hint */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-xs text-slate-500 text-center uppercase tracking-widest">
            {(() => {
              let dateStr = users.created_at;
              let date = new Date(dateStr);
              var month = date.toLocaleString('default', { month: 'long' });
              var year = date.getFullYear();
              return `Member since ${month} ${year}`;
            })()}
          </p>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="group p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-colors">
      <div className="flex items-center gap-3 mb-1 text-slate-400 group-hover:text-indigo-400 transition-colors">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-slate-200 font-medium pl-7">
        {value}
      </div>
    </div>
  );
}

function EditUserAccountForm({ users }) {
  return (
    <div className="w-full max-w-2xl bg-slate-900/40 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-xl shadow-2xl transition-all duration-500 ring-1 ring-white/5">

      <div className="pt-20 pb-10 px-10">
        {!isEditing ? (
          /* VIEW MODE: Clean Data Presentation */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-10">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">{users.name}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                    {users.user_type === 'a' ? 'Admin Access' : 'User Access'}
                  </span>
                  <span className="text-slate-500 text-xs flex items-center gap-1">
                    <Fingerprint size={12} /> ID: {users.id}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="group flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white text-sm font-semibold transition-all active:scale-95"
              >
                <Edit3 size={16} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoDisplay icon={<User size={18} />} label="Full Name" value={users.name} />
              <InfoDisplay icon={<Mail size={18} />} label="Email Address" value={users.email} />
              <InfoDisplay icon={<Phone size={18} />} label="Mobile Number" value={users.mobile} />
              <InfoDisplay icon={<ShieldCheck size={18} />} label="User Type" value={users.user_type === 'a' ? 'Administrator' : 'Standard'} />
            </div>
          </div>
        ) : (
          /* EDIT MODE: Structured Form */
          <form onSubmit={handleSave} className="animate-in fade-in zoom-in-95 duration-400">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-2xl font-bold text-white">Modify Profile</h2>
                <p className="text-slate-500 text-sm mt-1">Update your personal account details</p>
              </div>
              <button
                type="button"
                onClick={() => { setIsEditing(false); setFormData({ ...users }); }}
                className="p-3 hover:bg-white/5 text-slate-500 hover:text-white rounded-2xl transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup
                label="Full Name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(v) => setFormData({ ...formData, name: v })}
                icon={<User size={18} />}
              />
              <InputGroup
                label="Email Address"
                placeholder="name@company.com"
                type="email"
                value={formData.email}
                onChange={(v) => setFormData({ ...formData, email: v })}
                icon={<Mail size={18} />}
              />
              <InputGroup
                label="Mobile Number"
                placeholder="+91 00000 00000"
                value={formData.mobile}
                onChange={(v) => setFormData({ ...formData, mobile: v })}
                icon={<Phone size={18} />}
              />

              <div className="flex flex-col gap-2.5">
                <label className="text-[11px] uppercase font-bold text-slate-500 tracking-[0.15em] ml-1">User Authorization</label>
                <div className="relative group/select">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/select:text-indigo-400 transition-colors pointer-events-none">
                    <ShieldAlert size={18} />
                  </div>
                  <select
                    value={formData.user_type}
                    onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl py-3.5 pl-12 pr-4 text-slate-200 text-sm outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="a" className="bg-slate-900">Administrator</option>
                    <option value="u" className="bg-slate-900">Standard User</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-white/5">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-[2] flex items-center justify-center gap-2 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98]"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={20} />
                    Commit Changes
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-2xl font-bold transition-all border border-white/5"
              >
                Discard
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/**
 * ================= Result Section =================
 */


/**
 * ================= Answer Section =================
 */
