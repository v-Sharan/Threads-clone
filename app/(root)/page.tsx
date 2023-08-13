import ThreadCard from "@/components/card/ThreadCard";
import { fetchThreads } from "@/lib/actions/threads.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Home = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const { posts, isNext } = await fetchThreads(1, 30);
  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {posts.map((post: any) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
