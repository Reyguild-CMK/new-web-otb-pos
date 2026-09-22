// Component
import { Spinner } from "@/components/ui/spinner";

export function WaitingApproval(){
  return(
    <div className="flex flex-col gap-2 w-full bg-btn-action-bg rounded-sm p-4 text-center">
      <div className="flex self-center gap-2">
        <Spinner className="text-white"/>
        <h2 className="text-btn-action-text">Mohon Menunggu! Pengajuan Anda sedang dalam pengecekan!</h2>
      </div>
      <h4 className="text-gold">Harap info SM/AM untuk segera mengecek pengajuan Anda!</h4>
    </div>
  )
}