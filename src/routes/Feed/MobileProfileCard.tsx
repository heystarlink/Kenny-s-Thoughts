import { CONFIG } from "site.config"
import Image from "next/image"
import React from "react"
import styled from "@emotion/styled"
import { FiUser } from "react-icons/fi"

type Props = {
  className?: string
}

const MobileProfileCard: React.FC<Props> = () => {
  return (
    <StyledWrapper>
      <div className="top">
        <FiUser aria-hidden="true" />
        关于我
      </div>
      <div className="content">
        <div className="avatar">
          <Image
            src={CONFIG.profile.image}
            width={56}
            height={56}
            priority
            sizes="56px"
            css={{ objectFit: "cover" }}
            alt={`${CONFIG.profile.name} 的头像`}
          />
        </div>
        <div className="meta">
          <div className="name">{CONFIG.profile.name}</div>
          <div className="role">{CONFIG.profile.role}</div>
        </div>
      </div>
    </StyledWrapper>
  )
}

export default MobileProfileCard

const StyledWrapper = styled.div`
  display: block;

  @media (min-width: 1024px) {
    display: none;
  }

  > .top {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    padding: 0.25rem 0;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
  }
  > .content {
    display: flex;
    padding: 0.875rem;
    margin-bottom: 1.25rem;
    gap: 0.875rem;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 0.5rem;
    background-color: ${({ theme }) =>
      theme.scheme === "light" ? "white" : theme.colors.gray4};

    .avatar {
      overflow: hidden;
      width: 3.5rem;
      height: 3.5rem;
      flex-shrink: 0;
      border-radius: 0.375rem;
    }

    .meta {
      min-width: 0;
    }

    .name {
      margin-bottom: 0.2rem;
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 700;
    }

    .role {
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: ${({ theme }) => theme.colors.gray11};
    }
  }
`
