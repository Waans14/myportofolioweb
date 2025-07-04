import React from 'react';
import { motion } from 'framer-motion';

export default function GlassConnector() {
  return (
    <motion.div
      className="relative h-60 w-1 mx-auto my-12 rounded-full overflow-hidden bg-gradient-to-b from-blue-200/10 via-blue-400/30 to-blue-200/10 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-20 bg-blue-100/30 blur-md rounded-full"
        animate={{ y: ["0%", "100%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
