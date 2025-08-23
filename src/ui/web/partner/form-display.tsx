// form-display.tsx
import { useState, useCallback } from "react";
import { motion } from "motion/react";
import Lottie from "lottie-react";
import rocketFlight from "@/lottie/rocket-flight-lottie.json";
import { partnerQA } from "./_data";
import FormInput from "@/components/form-input";

type AnimationState = 'initial' | 'form' | 'submitting' | 'completed';

interface FormDisplayProps {
  onSubmit: () => void;
  animationState: AnimationState;
}

export default function FormDisplay({ 
  onSubmit, 
  animationState 
}: FormDisplayProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="w-full max-w-7xl mx-auto flex items-center gap-8">
      {/* Form Content Area - FAQ and Form OR Welcome Message */}
      <div className="w-full flex gap-8 relative">
        {/* Form View */}
        {animationState === 'form' && (
          <>
            {/* FAQ Section */}
            <motion.aside 
              className="relative glass w-full max-w-xl h-[30em] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="color-container p-4 overflow-x-hidden">
                {partnerQA.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className="p-4 space-y-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + (idx * 0.1) }}
                  >
                    <header className="flex items-center gap-3">
                      <span className="inline-block w-12 h-12 bg-gray-200 rounded-xl"></span>
                      <h3>{item?.question}</h3>
                    </header>
                    <p>{item?.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.aside>

            {/* Form Section */}
            <motion.section 
              className="relative glass w-full max-w-lg h-[40em] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="color-container p-6 space-y-12">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <FormInput
                    type="text"
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <FormInput
                    type="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <FormInput
                    type="text"
                    label="Company Name"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <FormInput
                    type="text"
                    label="Message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  />
                </motion.div>

                <motion.button 
                  type="submit" 
                  className="w-full p-4 text-base font-sans glass rounded-2xl hover:scale-105 transition-transform duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit
                </motion.button>
              </form>
            </motion.section>
          </>
        )}

        {/* Welcome Message - Appears immediately on submit */}
        {animationState === 'submitting' && (
          <motion.div
            className="flex-1 flex items-center justify-center min-h-[40em]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="text-center space-y-8">
              <motion.h2 
                className="!font-dm-mono !font-light text-5xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Welcome to the Family
              </motion.h2>
            </div>
          </motion.div>
        )}
      </div>

      {/* Rocket Animation - Fixed position, maintains space */}
      <div className="w-[30em] h-full">
        <motion.div 
          className="w-full h-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Lottie
            animationData={rocketFlight}
            loop={true}
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </div>
  );
}