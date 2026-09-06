import { createAboutCard } from "@/app/admin/actions";
import { AboutCardForm } from "../AboutCardForm";
export default function NewAboutCardPage() { return <AboutCardForm onSubmit={createAboutCard} />; }
