// Forms
import { DJModalAuto } from "../pawn/application/form-application/_form/DJAutoForm";
import { PGModalAuto } from "../pawn/application/form-application/_form/PGAutoForm";
import { DJModalManual } from "../pawn/application/form-application/_form/DJManualForm";
import { PGModalManual } from "../pawn/application/form-application/_form/PGManualForm";

export const form_type = {
  normal: {
    DJ: DJModalAuto,
    PG: PGModalAuto,
  },
  manual: {
    DJ: DJModalManual,
    PG: PGModalManual,
  },
};