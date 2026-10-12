import { Dispatch, SetStateAction } from "react";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { MailIcon, XIcon } from "lucide-react";

import ContactForm from "@/components/contact-form/contact-form";

export interface ContactFormModelProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function ContactFormModal({
  showModal,
  setShowModal,
}: ContactFormModelProps) {
  return (
    <Transition show={showModal}>
      <Dialog
        as="div"
        className="z-[999999]"
        onClose={() => setShowModal(false)}
      >
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-600/30 backdrop-blur-md" />
        </TransitionChild>
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 top-full"
            enterTo="opacity-100 top-16"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 top-16"
            leaveTo="opacity-0 top-full"
          >
            <DialogPanel className="border-accent/20 bg-accent shadow-accent/10 absolute m-4 w-[95%] max-w-xl overflow-y-auto rounded-2xl border-2 px-6 py-8 shadow-lg md:px-10 md:py-16">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-background flex items-center gap-1 text-2xl font-semibold sm:gap-2 md:text-4xl">
                  <MailIcon className="h-8 w-8 sm:h-10 sm:w-10" />
                  <span>Send Message</span>
                </DialogTitle>
                <button
                  className="border-accent bg-background text-accent hover:bg-background flex h-10 w-10 items-center justify-center rounded-full border-2 p-2 text-sm transition-transform hover:scale-[1.05]"
                  onClick={() => setShowModal(false)}
                >
                  <XIcon className="text-accent h-full w-full" />
                </button>
              </div>
              <ContactForm />
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
