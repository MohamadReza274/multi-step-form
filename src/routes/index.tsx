import {createFileRoute, ErrorComponent, type ErrorComponentProps, Link} from '@tanstack/react-router'
import {AddJobForm} from "#/components/form/add-job-form.tsx";
import Navbar from "#/components/navbar.tsx";
import {Button} from "#/components/ui/button.tsx";

export const Route = createFileRoute('/')({
    component: Home, errorComponent: MainError, notFoundComponent: () => {
        return <div>
            <h2>Page not found!</h2>
            <Button nativeButton={false} render={<Link to={"/"}>Back to Home page</Link>}/>
        </div>
    }
})


function MainError({error}: ErrorComponentProps) {
    return <ErrorComponent error={error}/>
}

function Home() {
    return (
        <div className="">
            <Navbar/>
            <main className="px-4 py-8">
                <AddJobForm/>
            </main>

        </div>
    )
}
