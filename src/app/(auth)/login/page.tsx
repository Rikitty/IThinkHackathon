import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-row items center justify-between p-24">
      <div className="flex-1 min-h-96">
        <h1>Hello</h1>
      </div>
      <div className="flex-1 min-h-80">
        <Card className="w-96">
          <CardHeader className="flex items-center">
            <CardTitle>
              <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Login
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
