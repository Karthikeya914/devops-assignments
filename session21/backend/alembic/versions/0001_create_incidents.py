from alembic import op
import sqlalchemy as sa

revision = "0001_create_incidents"
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        "incidents",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("service_name", sa.String(length=100), nullable=False, server_default="core-api"),
        sa.Column("severity", sa.String(length=20), nullable=False, server_default="P3-MEDIUM"),
        sa.Column("status", sa.String(length=30), nullable=False, server_default="OPEN"),
        sa.Column("description", sa.Text(), nullable=False, server_default=""),
        sa.Column("assignee", sa.String(length=120), nullable=False, server_default="On-Call Engineer"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_incidents_id", "incidents", ["id"])
    op.create_index("ix_incidents_service_name", "incidents", ["service_name"])

def downgrade():
    op.drop_index("ix_incidents_service_name", table_name="incidents")
    op.drop_index("ix_incidents_id", table_name="incidents")
    op.drop_table("incidents")
