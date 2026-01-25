import { weddingConfig } from '../config/wedding';

function Greeting() {
  const { greeting, groom, bride } = weddingConfig;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-md mx-auto text-center">
        <h2 className="font-serif text-2xl text-primary mb-8">{greeting.title}</h2>

        <p className="text-gray-600 whitespace-pre-line leading-relaxed">
          {greeting.message}
        </p>

        {/* 부모님 소개 */}
        <div className="mt-12 pt-8 border-t border-secondary">
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <div>
              <p>
                {groom.father.alive ? '' : '故 '}
                {groom.father.name} · {groom.mother.alive ? '' : '故 '}
                {groom.mother.name}
                <span className="text-primary ml-2">의 장남</span> {groom.name}
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-8 text-sm text-gray-600 mt-2">
            <div>
              <p>
                {bride.mother.alive ? '' : '故 '}
                {bride.mother.name}
                <span className="text-primary ml-2">의 차녀</span> {bride.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Greeting;
