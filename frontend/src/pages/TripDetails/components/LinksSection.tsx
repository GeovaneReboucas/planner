import { useState } from "react";
import { useParams } from "react-router-dom";
import { Captions, Link as Link1, Link2, Plus } from "lucide-react";

import { tripService } from "../../../services/TripService";
import { Link } from "../../../types";

import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { Input } from "../../../components/Input";

interface LinksSectionProps {
  links: Link[];
  findLinksByTrip: () => Promise<void>;
}

export function LinksSection({ links, findLinksByTrip }: LinksSectionProps) {
  const { tripId } = useParams();
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isLoadingCreateLink, setIsLoadingCreateLink] = useState(false);

  function toggleLinkModalOpen() {
    setIsLinkModalOpen(prevState => !prevState);
  }

  async function onCreateLink() {
    setIsLoadingCreateLink(true);
    await tripService.createLink(tripId!, {title, url})
    await findLinksByTrip();
    toggleLinkModalOpen();
    setIsLoadingCreateLink(false);
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      {!links.length ? (
        <p className="text-zinc-500 text-sm">Nenhum link cadastrado nessa viagem.</p>
      ) : (
        <div className="space-y-5">
          {links.map(link => (
            <div key={link.id} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">{link.title}</span>
                <a href={link.url} className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                  {link.url}
                </a>
              </div>
              <Link2 className="text-zinc-400 size-5 shrink-0" />
            </div>
          ))}
        </div>
      )}

      <Button variant="secondary" size="full" onClick={toggleLinkModalOpen}>
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {isLinkModalOpen && (
        <Modal title='Cadastrar Novo Link' onClose={toggleLinkModalOpen}>
          <div className="space-y-2">
            <Input
              icon={Captions}
              placeholder="Digite o título do link"
              disabled={isLoadingCreateLink}
              onChange={e => setTitle(e.target.value)}
            />
            <Input
              icon={Link1}
              placeholder="Digite a url"
              disabled={isLoadingCreateLink}
              onChange={e => setUrl(e.target.value)}
            />
            <Button
              size="full"
              disabled={isLoadingCreateLink}
              onClick={onCreateLink}
            >
              {isLoadingCreateLink ? 'Processando Informações...' : 'Cadastrar Link'}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
}