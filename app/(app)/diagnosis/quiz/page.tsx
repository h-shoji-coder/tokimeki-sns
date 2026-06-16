import { diagnosisQuestions } from "@/lib/mock-data";
import QuizClient from "./QuizClient";

export default function QuizPage() {
  return <QuizClient questions={diagnosisQuestions} />;
}
