"""create Lender Address table

Revision ID: 4b9c4b77a832
Revises: e6dd1df57514
Create Date: 2025-02-22 19:16:01.084371

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4b9c4b77a832'
down_revision: Union[str, None] = 'e6dd1df57514'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('borrower_address', sa.Column('id', sa.Integer(), autoincrement=True, primary_key=True),
    sa.Column('borrowers_id', sa.Integer(), sa.ForeignKey('borrowers.id', ondelete="CASCADE", onupdate="NO ACTION"), nullable=False, unique=True),
    sa.Column('state', sa.String(50), nullable=False),
    sa.Column('city', sa.String(50), nullable=False),
    sa.Column('street', sa.String(50), nullable=False),
    sa.Column('home_number', sa.String(50), nullable=True),
    sa.Column('landmark', sa.String(50), nullable=True))
    
    
def downgrade() -> None:
    op.drop_table('borrower_address')
