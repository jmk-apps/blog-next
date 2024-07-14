import {signIn, providerMap } from '@/auth'
import { AuthError } from "next-auth"
import {Button} from "@nextui-org/button";
import Link from "next/link";
import Image from 'next/image'
import {redirect} from "next/navigation";
import paths from "@/paths";


function getIcon(name: string) {
    if (name === "GitHub") {
       return <Image
           src='/github.svg'
           width={35}
           height={35}
           alt='Github icon'
       />
    } else if (name === "Google") {
        return <Image
           src='/google.svg'
           width={30}
           height={30}
           alt='Google icon'
       />
    }
}

export default async function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="flex flex-col gap-2 shadow-2xl rounded-md p-4">
            <div className='text-center mb-3'>
                <h1 className='font-black text-3xl mb-1'>Sign In</h1>
                <h3 className='font-light'>Sign in and and get access to more features.</h3>
            </div>
            {Object.values(providerMap).map((provider) => (
                <form key={provider.id}
                      action={async () => {
                              "use server"
                              try {
                                  await signIn(provider.id, { redirectTo: paths.home() })
                              } catch (error) {
                                  if (error instanceof AuthError) {
                                      console.log(`Error name: ${error.name}, Error message ${error.message} `)
                                      throw error
                                  }
                                  throw error
                              }

                          }
                      }
                >
                    <Button type="submit" className='w-96' variant='ghost'>
                        {getIcon(provider.name)}
                        <span>Sign in with {provider.name}</span>
                    </Button>
                </form>
            ))}
        </div>
        <div className='flex mt-3'>
            <h4 className='text-sm font-light'>Don&apos;t have an account?</h4>
            <Link href='/signup' className="text-primary ml-2 text-sm">Sign up</Link>
        </div>

    </div>
  )
}