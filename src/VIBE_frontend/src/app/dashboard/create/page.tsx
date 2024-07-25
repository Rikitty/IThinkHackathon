import CreateForm from "@/components/create/createForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Create() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex-1 min-h-96">
        <Card className="w-96">
          <CardHeader className="flex items-center">
            <CardTitle className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Create an Event
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center flex-col">
            <CreateForm />{" "}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
