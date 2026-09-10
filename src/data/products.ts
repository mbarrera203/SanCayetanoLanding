import { Category, Product } from '../types'

export const products: Product[] = [
  {
    id: 'p-sofa-lima',
    sku: 'SCM-LIV-001',
    name: 'Sofá Lima 3 cuerpos',
    category: 'Living',
    description: 'Tapizado en bouclé avena con patas de nogal macizo.',
    price: 1290000,
    stock: 12,
    image:
      'https://cdn.magicpatterns.com/patterns/generated-images/31eb8dd6-14ab-4c5f-8b09-92ce8f65ed40.jpg',
    featured: true,
  },
  {
    id: 'p-mesa-abra',
    sku: 'SCM-COM-014',
    name: 'Mesa Abra 180 cm',
    category: 'Comedor',
    description: 'Nogal macizo con canto biselado, para seis comensales.',
    price: 980000,
    compareAtPrice: 1150000,
    stock: 6,
    image:
      'https://cdn.magicpatterns.com/patterns/generated-images/445183ae-ff87-4ea8-9d97-98765de69451.jpg',
    featured: false,
  },
  {
    id: 'p-cama-sierra',
    sku: 'SCM-DOR-007',
    name: 'Cama Sierra queen',
    category: 'Dormitorio',
    description: 'Respaldo tapizado en lino crudo sobre base de roble.',
    price: 1450000,
    stock: 4,
    image:
      'https://cdn.magicpatterns.com/patterns/generated-images/bf494ce8-df99-4fa3-9aad-ce989ecd3f3d.jpg',
    featured: true,
  },
  {
    id: 'p-sillon-nube',
    sku: 'SCM-LIV-022',
    name: 'Sillón Nube',
    category: 'Living',
    description: 'Curvas envolventes en bouclé crema y roble natural.',
    price: 690000,
    stock: 18,
    image:
      'https://cdn.magicpatterns.com/patterns/generated-images/a30b1da9-7a51-41a5-bca6-3e18f240f976.jpg',
    featured: true,
  },
  {
    id: 'p-aparador-cordoba',
    sku: 'SCM-COM-031',
    name: 'Aparador Córdoba',
    category: 'Comedor',
    description: 'Frentes ranurados en nogal con tiradores de bronce.',
    price: 1120000,
    stock: 3,
    image:
      'https://cdn.magicpatterns.com/patterns/generated-images/c59a83e3-e15f-42ff-994e-c54b37e9b07e.jpg',
    featured: false,
  },
  {
    id: 'p-mesa-luz-ronda',
    sku: 'SCM-DOR-018',
    name: 'Mesa de luz Ronda',
    category: 'Dormitorio',
    description: 'Roble macizo con cajón y estante inferior abierto.',
    price: 245000,
    stock: 24,
    image:
      'https://cdn.magicpatterns.com/patterns/generated-images/69f16f4e-13cf-46ad-867b-046d23464363.jpg',
    featured: false,
  },
  {
    id: 'p-biblioteca-atlas',
    sku: 'SCM-LIV-040',
    name: 'Biblioteca Atlas',
    category: 'Living',
    description: 'Estructura de hierro negro con estantes de roble claro.',
    price: 815000,
    compareAtPrice: 940000,
    stock: 0,
    image:
      'https://cdn.magicpatterns.com/patterns/generated-images/a62c4227-e0f4-4310-9122-7a7d3c8a5a2d.jpg',
    featured: false,
  },
  {
    id: 'p-heladera-polar',
    sku: 'SCM-ELE-002',
    name: 'Heladera French Door 550 L',
    category: 'Electro',
    description: 'No frost, inverter y dispenser de agua. Acero inoxidable.',
    price: 1890000,
    compareAtPrice: 2250000,
    stock: 9,
    image:
      'https://cdn.magicpatterns.com/patterns/generated-images/3a09cf93-90fe-4924-aeee-ffb36f1ccd46.jpg',
    featured: false,
  },
  {
    id: 'p-smart-tv-65',
    sku: 'SCM-ELE-011',
    name: 'Smart TV 4K 65"',
    category: 'Electro',
    description: 'Panel sin marco, HDR10+ y soporte incluido.',
    price: 1150000,
    compareAtPrice: 1420000,
    stock: 15,
    image:
      'https://cdn.magicpatterns.com/patterns/generated-images/38873671-c5a0-404d-819e-9e0a77dd0e3e.jpg',
    featured: false,
  },
  {
    id: 'p-lavarropas-9kg',
    sku: 'SCM-ELE-024',
    name: 'Lavarropas carga frontal 9 kg',
    category: 'Electro',
    description: 'Motor inverter silencioso, 1400 rpm y 14 programas.',
    price: 890000,
    stock: 7,
    image:
      'https://cdn.magicpatterns.com/patterns/generated-images/e19b98fd-350b-4c52-8dbc-149c118a7ac7.jpg',
    featured: true,
  },
  {
    id: 'p-colchon-serena',
    sku: 'SCM-COL-005',
    name: 'Colchón Serena queen',
    category: 'Colchones',
    description: 'Resortes pocket con pillow top de viscoelástica.',
    price: 720000,
    compareAtPrice: 895000,
    stock: 11,
    image:
      'https://cdn.magicpatterns.com/patterns/generated-images/de27fe8c-1136-458c-a1c0-0f908b526a29.jpg',
    featured: false,
  },
  {
    id: 'p-lampara-faro',
    sku: 'SCM-DEC-009',
    name: 'Lámpara de pie Faro',
    category: 'Deco',
    description: 'Pantalla de lino crudo con trípode de roble macizo.',
    price: 198000,
    stock: 21,
    image:
      'https://cdn.magicpatterns.com/patterns/generated-images/71470901-ac8b-423c-ae6c-83572f313ae0.jpg',
    featured: false,
  },
]

export const featuredProducts = products.filter((product) => product.featured)

export const offerProducts = products.filter(
  (product) => typeof product.compareAtPrice === 'number' && product.stock > 0,
)

export interface CategoryEntry {
  label: Category
  href: string
  blurb: string
}

export const categories: CategoryEntry[] = [
  { label: 'Living', href: '#living', blurb: 'Sofás, sillones y bibliotecas' },
  { label: 'Comedor', href: '#comedor', blurb: 'Mesas, sillas y aparadores' },
  { label: 'Dormitorio', href: '#dormitorio', blurb: 'Camas y mesas de luz' },
  { label: 'Electro', href: '#electro', blurb: 'Heladeras, TV y lavado' },
  { label: 'Colchones', href: '#colchones', blurb: 'Sommiers y almohadas' },
  { label: 'Deco', href: '#deco', blurb: 'Iluminación y textiles' },
]

export function countByCategory(category: Category): number {
  return products.filter((product) => product.category === category).length
}

export const navLinks: { label: string; href: string }[] = [
  { label: 'Living', href: '#living' },
  { label: 'Comedor', href: '#comedor' },
  { label: 'Dormitorio', href: '#dormitorio' },
  { label: 'Electro', href: '#electro' },
  { label: 'Colchones', href: '#colchones' },
  { label: 'Ofertas', href: '#ofertas' },
]

export const footerLinks: { label: string; href: string }[] = [
  ...categories.map(({ label, href }) => ({ label: label as string, href })),
  { label: 'Ofertas', href: '#ofertas' },
]
