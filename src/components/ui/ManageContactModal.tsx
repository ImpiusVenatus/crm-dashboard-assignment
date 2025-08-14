'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Dropdown, { type Option } from './Dropdown';

export default function ManageContactModal({
    open,
    onClose,
    phoneCountry,
    onChangePhoneCountry,
    phoneCountryOptions,
    phoneNumber,
    onChangePhoneNumber,
    email,
    onChangeEmail,
}: {
    open: boolean;
    onClose: () => void;
    phoneCountry: string;
    onChangePhoneCountry: (v: string) => void;
    phoneCountryOptions: Option[];
    phoneNumber: string;
    onChangePhoneNumber: (v: string) => void;
    email: string;
    onChangeEmail: (v: string) => void;
}) {
    const border = 'border-[#2a2f36]';
    const panelBg = 'bg-[#222225]';
    const strong = 'text-[#e6eaf2]';
    const soft = 'text-[#98a2b3]';

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-[90] bg-black/60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                    {/* Modal */}
                    <motion.div
                        key="modal"
                        className="fixed inset-0 z-[91] flex items-center justify-center p-4"
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        onMouseDown={(e) => {
                            // click outside closes (but ignore clicks inside the panel)
                            if (e.target === e.currentTarget) onClose();
                        }}
                    >
                        <div className={`w-full max-w-md rounded-xl ${panelBg} border ${border} shadow-2xl`}>
                            {/* Header */}
                            <div className={`flex items-center justify-between px-4 py-3 border-b ${border}`}>
                                <h3 className={`text-sm font-semibold ${strong}`}>Manage Contact</h3>
                                <button
                                    className="p-2 rounded-md text-[#7b8696] hover:bg-[#1a2029]"
                                    onClick={onClose}
                                    title="Close"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="px-4 py-4 space-y-4">
                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className={`text-xs ${soft}`}>Phone number</label>
                                    <div className="flex gap-2">
                                        <Dropdown
                                            value={phoneCountry}
                                            onChange={onChangePhoneCountry}
                                            options={phoneCountryOptions}
                                            menuClass="mt-2"
                                        />
                                        <input
                                            value={phoneNumber}
                                            onChange={(e) => onChangePhoneNumber(e.target.value)}
                                            placeholder="Enter phone number"
                                            className={`flex-1 rounded-lg px-3 py-2 bg-transparent border ${border} ${strong} outline-none focus:ring-2 focus:ring-[#2e3947]`}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className={`text-xs ${soft}`}>Email address</label>
                                    <input
                                        value={email}
                                        onChange={(e) => onChangeEmail(e.target.value)}
                                        placeholder="Enter email address"
                                        className={`w-full rounded-lg px-3 py-2 bg-transparent border ${border} ${strong} outline-none focus:ring-2 focus:ring-[#2e3947]`}
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className={`flex items-center justify-end gap-2 px-4 py-3 border-t ${border}`}>
                                <button
                                    onClick={onClose}
                                    className="px-3 py-2 rounded-lg text-sm text-[#e6eaf2] border border-[#2a2f36] hover:bg-[#1a2029]"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-3 py-2 rounded-lg text-sm bg-[#1f2632] text-[#b6c8ff] border border-[#2e3947] hover:bg-[#243042]"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
