'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Crown,
    CircleAlert
} from 'lucide-react';

const TopBanner = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#3F3322] shadow-lg flex-shrink-0"
            >
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                            >
                                <CircleAlert className="w-4 h-4 text-[#FFA023]" />
                            </motion.div>

                            <div className="flex items-center space-x-2">
                                <span className="font-medium text-xs sm:text-sm">
                                    Your Growth Plan trial ends in 6 days on Aug 18, 2025.
                                </span>
                                <motion.span
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-[#FFA023] font-semibold text-xs sm:text-sm"
                                >
                                    Upgrade now to avoid service disruption!
                                </motion.span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <motion.button
                                whileHover={{ opacity: 0.9 }}
                                whileTap={{ opacity: 0.7 }}
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#FFA023] text-black rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2 font-medium text-xs sm:text-sm"
                            >
                                <Crown className="w-3 h-3 sm:w-3 sm:h-3" />
                                <span className="hidden sm:inline">Upgrade now</span>
                                <span className="sm:hidden">Upgrade</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default TopBanner;
