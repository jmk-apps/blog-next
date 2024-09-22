import Image from 'next/image'

export default function About() {
    return (
        <>
            <h1 className="font-bold">Who Are We?</h1>
            <p className="font-bold">
                He@d$p@ce was started in 2024 by John Doe. He@d$p@ce is more than just a blog but a place that
                readers can receive tools that can help anyone willing to learn to get to the right headspace. Mental
                health is so important that if you're not thinking correctly, you can make decisions that can cause
                unnecessary trauma and destruction to your life.
            </p>
            <p>
                Everyone goes through highs and lows in their life that can impact there mental stat, dealing with the
                highs and lows in a healthy manner is possible. We cover different categories such as Technology, work,
                travel, books and various activities to help build your mental fortitude.
            </p>
            <h3 className="font-bold">Our Team</h3>
            <div className="flex mb-2">
                <div>
                    <Image
                        src="/about_pic.jpg"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                    />
                    <h2>John Doe</h2>
                    <p>FOUNDER</p>
                    <p>
                        John Doe is an established web developer and
                        inventor. Always tries to see new ways to use
                        technology to help the community.
                    </p>
                </div>
                <div>
                    <Image
                        src="/about_pic2.jpg"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                    />
                    <h2>Jane Smith</h2>
                    <p>FOUNDER</p>
                    <p>
                        Jane Smith is an editor with a passion for writing. She
                        has written many books which became best sellers. She is
                        also skilled in photography
                    </p>
                </div>

            </div>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid culpa dolores ipsa iusto minus
                omnis quibusdam quidem saepe voluptas? Cum doloremque,
                esse laborum natus perspiciatis similique unde veritatis voluptates consectetur adipisicing elit. Alias
                aliquid culpa dolores!
            </p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi autem beatae deserunt distinctio, dolore
                incidunt inventore libero nobis officia officiis! </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid culpa dolores ipsa iusto minus
                omnis quibusdam quidem saepe voluptas? Cum doloremque,
                esse laborum natus perspiciatis similique unde veritatis voluptates consectetur adipisicing elit. Alias
                aliquid culpa dolores!
            </p>
            <div className="grid grid-cols-3 gap-4 p-4">
                <div>
                    <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.  </li>
                        <li>Culpa hic molestias natus optio quia</li>
                    </ul>
                </div>

                <div>
                    <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                        <li>Culpa hic molestias natus optio quia</li>
                    </ul>
                </div>

                <div>
                    <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                        <li>Culpa hic molestias natus optio quia</li>
                    </ul>
                </div>
            </div>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias corporis culpa, cumque deserunt distinctio
                ea, enim eum excepturi iste molestiae natus odio odit possimus, provident quasi quisquam quo recusandae veniam.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias corporis culpa, cumque deserunt distinctio
                ea, enim eum excepturi iste molestiae natus odio odit possimus, provident quasi quisquam quo recusandae veniam.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias corporis culpa, cumque deserunt distinctio
                ea, enim eum excepturi iste molestiae natus odio odit possimus, provident quasi quisquam quo recusandae veniam.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias corporis culpa, cumque deserunt distinctio
                ea, enim eum excepturi iste molestiae natus odio odit possimus, provident quasi quisquam quo recusandae veniam.
            </p>
        </>
    )
}