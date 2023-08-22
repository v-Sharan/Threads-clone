import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/card/UserCard";
import Searchbar from "@/components/shared/Searchbar";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <Searchbar routeType='search' />

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No users</p>
        ) : (
          <>
            {result.users.map((user) => (
              <UserCard
                name={user.name}
                id={user.id}
                image={user.image}
                username={user.username}
                key={user.id}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default page;
