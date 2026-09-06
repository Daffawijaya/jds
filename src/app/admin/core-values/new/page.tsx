import { createCoreValue } from "@/app/admin/actions";
import { CoreValueForm } from "../CoreValueForm";
export default function NewCoreValuePage() { return <CoreValueForm onSubmit={createCoreValue} />; }
