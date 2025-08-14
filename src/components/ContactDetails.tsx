'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    User, Globe, MoreVertical, Plus,
    Info, PhoneCall, Clock, Settings,
    PanelRightClose, PanelLeftClose, ExternalLink, X,
} from 'lucide-react';

import Dropdown, { type Option } from './ui/Dropdown';
import FlagBD from './flags/FlagBD';
import ManageContactModal from './ui/ManageContactModal';

interface ContactDetailsProps {
    onClose: () => void;
    isMobile?: boolean;
}

const PANEL_W = 352;
const PANEL_W_MIN = 280;
const PANEL_W_MAX = 640;
const RAIL_W = 48;

const panelBg = 'bg-[#222225]';
const headerBg = 'bg-[#222225]';
const border = 'border-[#2a2f36]';
const soft = 'text-[#98a2b3]';
const strong = 'text-[#e6eaf2]';
const dim = 'text-[#7b8696]';

export default function ContactDetails({ onClose, isMobile = false }: ContactDetailsProps) {
    const [collapsed, setCollapsed] = useState(false);

    // resizable width (desktop)
    const [panelWidth, setPanelWidth] = useState<number>(PANEL_W);
    const dragRef = useRef<{ startX: number; startW: number; dragging: boolean }>({
        startX: 0, startW: PANEL_W, dragging: false,
    });

    // right-rail tab
    const [activeTab, setActiveTab] = useState<'profile' | 'call' | 'activity' | 'settings' | 'apps'>('profile');

    // data
    const [phoneCountry, setPhoneCountry] = useState('+880');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('bd');
    const [language, setLanguage] = useState('en');

    // modal
    const [manageOpen, setManageOpen] = useState(false);

    const countryOptions: Option[] = [
        { value: 'bd', label: 'Bangladesh', icon: <FlagBD /> },
        { value: 'us', label: 'United States', icon: <span className="w-4 h-4 rounded-sm bg-[#b22234]" /> },
        { value: 'in', label: 'India', icon: <span className="w-4 h-4 rounded-sm bg-[#ff9933]" /> },
    ];
    const phoneCountryOptions: Option[] = [
        { value: '+880', label: '+880', icon: <FlagBD /> },
        { value: '+1', label: '+1', icon: <span className="w-4 h-4 rounded-sm bg-[#b22234]" /> },
        { value: '+91', label: '+91', icon: <span className="w-4 h-4 rounded-sm bg-[#ff9933]" /> },
    ];
    const languageOptions: Option[] = [
        { value: 'en', label: 'English' },
        { value: 'bn', label: 'Bengali' },
        { value: 'hi', label: 'Hindi' },
    ];

    const railBtnBase = `p-2 rounded-lg border ${border} text-[#7b8696] hover:bg-[#1a2029] hover:text-[#e6eaf2]`;
    const railBtnActive = 'p-2 rounded-lg bg-[#6CA3FF] text-black border border-[#2e3947]';

    // === Desktop resizer (left edge of right panel) ===
    const onResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
        if (collapsed) return;
        dragRef.current = { startX: e.clientX, startW: panelWidth, dragging: true };
        window.addEventListener('mousemove', onResizeMove);
        window.addEventListener('mouseup', onResizeEnd);
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
    };
    const onResizeMove = (e: MouseEvent) => {
        if (!dragRef.current.dragging) return;
        const dx = dragRef.current.startX - e.clientX; // drag left => wider
        const next = Math.max(PANEL_W_MIN, Math.min(PANEL_W_MAX, dragRef.current.startW + dx));
        setPanelWidth(next);
    };
    const onResizeEnd = () => {
        dragRef.current.dragging = false;
        window.removeEventListener('mousemove', onResizeMove);
        window.removeEventListener('mouseup', onResizeEnd);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
    };
    useEffect(() => {
        return () => {
            window.removeEventListener('mousemove', onResizeMove);
            window.removeEventListener('mouseup', onResizeEnd);
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        };
    }, [onResizeEnd]);

    // ====== MOBILE RENDER (restored) ======
    if (isMobile) {
        return (
            <>
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
                <div className="fixed inset-0 z-50 bg-[#222225] overflow-y-auto">
                    {/* Mobile Header */}
                    <div className={`${headerBg} border-b ${border} px-4 py-3 flex items-center justify-between`}>
                        <h2 className={`text-lg font-semibold ${strong}`}>Contact Details</h2>
                        <button onClick={onClose} className="p-2 rounded-md hover:bg-[#1a2029] text-[#7b8696]">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mobile Content */}
                    <div className="p-4 space-y-6">
                        {/* Profile row */}
                        <div className="flex items-center gap-3 p-4 bg-[#1a2029] rounded-lg">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffb84a] to-[#ff9b2f] flex items-center justify-center font-semibold text-[#0e1116] text-lg">
                                🙂
                            </div>
                            <div className="min-w-0">
                                <div className={`text-lg font-medium ${strong}`}>Test one</div>
                                <div className={`text-sm ${dim}`}>ID: 307237353</div>
                            </div>
                        </div>

                        {/* Contact Fields */}
                        <section>
                            <h4 className={`text-lg font-semibold ${strong} mb-4`}>Contact Fields</h4>
                            <div className="space-y-4">
                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm">
                                        <span className={soft}>Phone Number</span>
                                        <Info className="w-4 h-4 text-[#647084]" />
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <Dropdown
                                            value={phoneCountry}
                                            onChange={setPhoneCountry}
                                            options={phoneCountryOptions}
                                            menuClass="mt-2"
                                        />
                                        <div className={`py-2 text-sm ${strong} flex-1`}>
                                            {phoneNumber || <span className="text-[#8e98a8]">Add phone number</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm">
                                        <span className={soft}>Email Address</span>
                                        <Info className="w-4 h-4 text-[#647084]" />
                                    </label>
                                    <div className={`py-2 text-sm ${email ? strong : 'text-[#8e98a8]'}`}>
                                        {email || 'Add Email Address'}
                                    </div>
                                </div>

                                {/* Country */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm">
                                        <span className={soft}>Country</span>
                                        <Info className="w-4 h-4 text-[#647084]" />
                                    </label>
                                    <Dropdown value={country} onChange={setCountry} options={countryOptions} menuClass="mt-2" />
                                </div>

                                {/* Language */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm">
                                        <span className={soft}>Language</span>
                                        <Info className="w-4 h-4 text-[#647084]" />
                                    </label>
                                    <Dropdown value={language} onChange={setLanguage} options={languageOptions} menuClass="mt-2" />
                                </div>
                            </div>
                        </section>

                        {/* Tags */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className={`text-lg font-semibold ${strong}`}>Tags</h4>
                                <button className={`text-sm cursor-pointer hover:text-[#b6c8ff] flex items-center gap-2 border ${border} p-2 rounded-lg`}>
                                    <Plus className="w-4 h-4" />
                                    <span>Add Tag</span>
                                </button>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Manage Modal (mobile too) */}
                <ManageContactModal
                    open={manageOpen}
                    onClose={() => setManageOpen(false)}
                    phoneCountry={phoneCountry}
                    onChangePhoneCountry={setPhoneCountry}
                    phoneCountryOptions={phoneCountryOptions}
                    phoneNumber={phoneNumber}
                    onChangePhoneNumber={setPhoneNumber}
                    email={email}
                    onChangeEmail={setEmail}
                />
            </>
        );
    }

    // ====== DESKTOP RENDER (resizable, preserved) ======
    const totalWidth = collapsed ? RAIL_W : panelWidth + RAIL_W;

    return (
        <>
            <motion.aside
                className={`relative h-full flex flex-shrink-0 ${panelBg} border-l ${border} overflow-hidden`}
                initial={{ width: totalWidth }}
                animate={{ width: totalWidth }}
                transition={{ type: 'tween', ease: 'easeOut', duration: 0.25 }}
                style={{ width: totalWidth }}
            >
                {/* Drag handle on left edge */}
                {!collapsed && (
                    <div
                        onMouseDown={onResizeStart}
                        title="Resize"
                        className="absolute left-0 top-0 h-full w-1 cursor-col-resize group"
                    >
                        <div className="absolute inset-y-0 left-0 w-[2px] bg-transparent group-hover:bg-[#2a2f36]" />
                    </div>
                )}

                {/* Collapsible left content */}
                {!collapsed && (
                    <div className="flex-1 flex flex-col min-w-0">
                        {/* Header */}
                        <div className={`${headerBg} border-b ${border} px-4 py-3`}>
                            <div className="flex items-center justify-between">
                                <h2 className={`text-sm font-semibold ${strong}`}>Contact details</h2>
                                <div className="flex items-center gap-1">
                                    <button
                                        className="p-2 rounded-md hover:bg-[#1a2029] text-[#7b8696]"
                                        title="Collapse panel"
                                        onClick={() => setCollapsed(true)}
                                    >
                                        <PanelRightClose className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-md hover:bg-[#1a2029] text-[#7b8696]" title="More">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Profile row */}
                            <div className="mt-3 flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ffb84a] to-[#ff9b2f] flex items-center justify-center font-semibold text-[#0e1116]">
                                    🙂
                                </div>
                                <div className="min-w-0">
                                    <div className={`text-sm font-medium ${strong}`}>Test one</div>
                                    <div className={`text-xs ${dim}`}>ID: 307237353</div>
                                </div>
                            </div>

                            {/* Channels row */}
                            <div className="mt-2 flex items-center justify-end">
                                <h3 className={`text-sm font-semibold ${strong}`}>Channels</h3>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-6">
                            <section>
                                <div className="px-4 py-3 flex items-center justify-between">
                                    <h4 className={`text-sm font-semibold ${strong}`}>Contact fields</h4>
                                    <button
                                        className="text-xs text-[#8ab4ff] hover:text-[#b6c8ff] cursor-pointer flex items-center gap-2"
                                        onClick={() => setManageOpen(true)}
                                    >
                                        Manage <ExternalLink className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="px-4 py-3 space-y-4">
                                    {/* Phone */}
                                    <div className="space-y-1">
                                        <label className="flex items-center gap-2 text-xs">
                                            <span className={soft}>Phone Number</span>
                                            <Info className="w-3 h-3 text-[#647084]" />
                                        </label>

                                        <div className="flex items-center gap-3">
                                            <Dropdown
                                                value={phoneCountry}
                                                onChange={setPhoneCountry}
                                                options={phoneCountryOptions}
                                                menuClass="mt-2"
                                            />
                                            <div className={`py-1.5 text-sm ${strong}`}>
                                                {phoneNumber || <span className="text-[#8e98a8]"></span>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <FieldRow label="Email Address">
                                        <span className={`text-sm ${email ? strong : 'text-[#8e98a8]'}`}>
                                            {email || 'Add Email Address'}
                                        </span>
                                    </FieldRow>

                                    {/* Country */}
                                    <FieldRow label="Country">
                                        <Dropdown value={country} onChange={setCountry} options={countryOptions} menuClass="mt-2" />
                                    </FieldRow>

                                    {/* Language */}
                                    <FieldRow label="Language">
                                        <Dropdown value={language} onChange={setLanguage} options={languageOptions} menuClass="mt-2" />
                                    </FieldRow>
                                </div>
                            </section>
                        </div>

                        {/* Bottom: Tags */}
                        <div className={`border-t ${border} px-4`}>
                            <div className="px-4 py-3 flex items-center justify-between">
                                <h4 className={`text-sm font-semibold ${strong}`}>Tags</h4>
                                <button className={`text-xs cursor-pointer hover:text-[#b6c8ff] flex items-center gap-1 border ${border} p-2 rounded-lg`}>
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Right action rail */}
                <div className={`w-12 border-l ${border} ${headerBg} flex flex-col items-center py-3 gap-3`}>
                    {collapsed ? (
                        <button
                            className="p-2 rounded-lg text-[#7b8696] hover:bg-[#1a2029] hover:text-[#e6eaf2]"
                            title="Expand panel"
                            onClick={() => setCollapsed(false)}
                        >
                            <PanelLeftClose className="w-4 h-4" />
                        </button>
                    ) : (
                        <div className="h-8" />
                    )}

                    <button
                        className={activeTab === 'profile' ? railBtnActive : railBtnBase}
                        title="Profile"
                        onClick={() => setActiveTab('profile')}
                    >
                        <User className="w-4 h-4" />
                    </button>
                    <button
                        className={activeTab === 'call' ? railBtnActive : railBtnBase}
                        title="Call"
                        onClick={() => setActiveTab('call')}
                    >
                        <PhoneCall className="w-4 h-4" />
                    </button>
                    <button
                        className={activeTab === 'activity' ? railBtnActive : railBtnBase}
                        title="Activity"
                        onClick={() => setActiveTab('activity')}
                    >
                        <Clock className="w-4 h-4" />
                    </button>
                    <button
                        className={activeTab === 'settings' ? railBtnActive : railBtnBase}
                        title="Settings"
                        onClick={() => setActiveTab('settings')}
                    >
                        <Settings className="w-4 h-4" />
                    </button>
                    <button
                        className={activeTab === 'apps' ? railBtnActive : railBtnBase}
                        title="Apps"
                        onClick={() => setActiveTab('apps')}
                    >
                        <Globe className="w-4 h-4" />
                    </button>
                </div>
            </motion.aside>

            {/* Manage Modal */}
            <ManageContactModal
                open={manageOpen}
                onClose={() => setManageOpen(false)}
                phoneCountry={phoneCountry}
                onChangePhoneCountry={setPhoneCountry}
                phoneCountryOptions={phoneCountryOptions}
                phoneNumber={phoneNumber}
                onChangePhoneNumber={setPhoneNumber}
                email={email}
                onChangeEmail={setEmail}
            />
        </>
    );
}

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
    const soft = 'text-[#98a2b3]';
    return (
        <div className="space-y-1">
            <label className="flex items-center gap-2 text-xs">
                <span className={soft}>{label}</span>
                <Info className="w-3 h-3 text-[#647084]" />
            </label>
            <div>{children}</div>
        </div>
    );
}
