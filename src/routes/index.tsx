import {createFileRoute} from '@tanstack/react-router'
import {AddJobForm} from "#/components/form/add-job-form.tsx";

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
        <main>
            <AddJobForm/>
        </main>

    </div>
  )
}
