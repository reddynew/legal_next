import { ArrowRight, Bell, NotebookPen, X } from "lucide-react";
import { Button } from "./ui/button";
import '../app/index.css'

const NotificationBanner = () => {
    return (
      <div className="hidden sm:block bg-primary text-primary-foreground px-4 py-2 text-sm relative overflow-hidden">
        {/* shimmer effect */}
        <div className="absolute max-w-6xl inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer z040"></div> 
        <div className="container-custom mx-auto max-w-6xl flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 pl-50">
            <NotebookPen className="w-4 h-4" />
            <span className="hidden sm:inline">
            At JPLawSuvidha, we function as a technology platform that helps clients access legal assistance easily.
            </span>
          </div>
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={Close}
            className="text-primary-foreground hover:bg-primary-foreground/20 h-auto p-1"
          >
            <X className="w-3 h-3" />
          </Button> */}
        </div>
      </div>
    );
  };
  export default NotificationBanner