"""create User Table

Revision ID: ff8a2009a132
Revises: 
Create Date: 2025-02-22 19:02:49.590662

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from datetime import datetime


# revision identifiers, used by Alembic.
revision: str = 'ff8a2009a132'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('users', sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False, unique=True),
    sa.Column('email', sa.String(50), nullable=False, unique=True),
    sa.Column('password', sa.String(255), nullable=False),
    sa.Column('is_admin', sa.Boolean(), default=False),
    sa.Column('created_at', sa.DateTime(), default=datetime.now()),
    sa.Column('updated_at', sa.DateTime(), default=datetime.now()),)
    


def downgrade() -> None:
    op.drop_table('users')
