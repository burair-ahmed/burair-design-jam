import Footer from '@/app/components/Footer'
import Header from '@/app/components/Header'
import PageHero from '@/app/components/Page-Hero'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (

<div>
<Header/>
<PageHero title='Sign-in'/>
<div className='flex items-center justify-center my-2 md:my-16'>
<SignIn />
</div>
<Footer/>
</div>
)}