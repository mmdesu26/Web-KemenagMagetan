// import Link from "next/link"

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
//       <div className="container mx-auto px-4 py-16">
//         <div className="text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-8 text-green-800">Kementerian Agama</h1>
//           <h2 className="text-2xl md:text-3xl mb-8 text-green-600">Kabupaten Magetan</h2>
//           <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
//             Melayani dengan sepenuh hati untuk kemajuan pendidikan agama dan kerukunan umat beragama di Kabupaten
//             Magetan
//           </p>

//           <div className="space-y-4">
//             <Link
//               href="/profil/sejarah"
//               className="inline-block px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-300 font-semibold"
//             >
//               Lihat Sejarah Instansi
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-green-800">Kementerian Agama</h1>
          <h2 className="text-2xl md:text-3xl mb-8 text-green-600">Kabupaten Magetan</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Melayani dengan sepenuh hati untuk kemajuan pendidikan agama dan kerukunan umat beragama di Kabupaten
            Magetan
          </p>

          <div className="space-y-4">
            <Link
              href="/profil/sejarah"
              className="inline-block px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-300 font-semibold"
            >
              Lihat Sejarah Instansi
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
