import { FileText, X } from "lucide-react";
import { Button } from "./ui/button";

const TermsAndConditionsModal = ({ onClose, onAccept }: { onClose: () => void; onAccept: () => void }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-gray-200 flex justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Terms and Conditions</h3>
            <p className="text-sm text-gray-600">Legal Platform Usage Agreement</p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
      </div>
      
      <div className="p-6 overflow-y-auto max-h-96">
        <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
          <section>
            <h4 className="font-semibold text-gray-900 mb-2">1. Platform Access & Usage</h4>
            <p className="text-sm leading-relaxed">By accessing this legal portal, you acknowledge that you are a licensed legal professional or authorized personnel with legitimate access to this system.</p>
          </section>
          
          <section>
            <h4 className="font-semibold text-gray-900 mb-2">2. Confidentiality & Privacy</h4>
            <ul className="text-sm space-y-1 list-disc pl-4">
              <li>Maintain strict confidentiality of all client information</li>
              <li>Protect attorney-client privilege at all times</li>
              <li>Report any potential data breaches immediately</li>
              <li>Use secure networks and devices only</li>
            </ul>
          </section>
          
          <section>
            <h4 className="font-semibold text-gray-900 mb-2">3. Professional Responsibility</h4>
            <ul className="text-sm space-y-1 list-disc pl-4">
              <li>Comply with all applicable legal and ethical standards</li>
              <li>Use the platform only for legitimate legal purposes</li>
              <li>Maintain accurate and up-to-date professional credentials</li>
              <li>Follow all firm policies and procedures</li>
            </ul>
          </section>
          
          <section>
            <h4 className="font-semibold text-gray-900 mb-2">4. Security Requirements</h4>
            <ul className="text-sm space-y-1 list-disc pl-4">
              <li>Protect your login credentials and enable two-factor authentication</li>
              <li>Log out from shared or public devices</li>
              <li>Report suspicious activity immediately</li>
              <li>Use strong, unique passwords</li>
            </ul>
          </section>
        </div>
      </div>
      
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="flex gap-3">
          {/* <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button> */}
          <Button onClick={onAccept} className="flex-1 bg-blue-600 hover:bg-blue-700">
            Accept & Continue
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default TermsAndConditionsModal