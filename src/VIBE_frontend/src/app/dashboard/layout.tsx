import NavigationBar from "@/components/navigation/navbar"

export default function DashboardLayout(
    {children} : {
        children: React.ReactNode
    }
) {
    return (
        <section>
            <NavigationBar/>
            <h1>Hello</h1>
            {children}
        </section>

    )
}