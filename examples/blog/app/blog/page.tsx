import { getPosts } from 'app/db/blog';
import Link from 'next/link';

export const metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
};

export default async function BlogPage() {
  let allBlogs = await getPosts();

  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        read my blog
      </h1>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.date) > new Date(b.date)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.title}
              </p>
              <p className='text-neutral-600 dark:text-neutral-400'>{post.summary}</p>
            </div>
          </Link>
        ))}
    </section>
  );
}
