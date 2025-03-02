"""create Lender table

Revision ID: e6dd1df57514
Revises: ff8a2009a132
Create Date: 2025-02-22 19:09:58.083398

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e6dd1df57514'
down_revision: Union[str, None] = 'ff8a2009a132'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('borrowers', sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, unique=True),
    sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id', ondelete="CASCADE", onupdate="NO ACTION"), unique=True),
    sa.Column('first_name', sa.String(100), nullable=False),
    sa.Column('middle_name', sa.String(100), nullable=False),
    sa.Column('last_name', sa.String(100), nullable=False),
    sa.Column('birth_date', sa.DateTime(), nullable=False))
    


def downgrade() -> None:
    op.drop_table('borrowers')
