import ListComments from './components/list_comments'

const Discussion = () => {
  return (
    <div className="flex flex-col p-5 space-y-5 w-full justify-between items-center">
      <p className="text-xl font-semibold">Discusstion</p>
      <div className="flex flex-col w-3/4">
        <ListComments SortBy={'created_at'} />
      </div>
    </div>
  )
}

export default Discussion
